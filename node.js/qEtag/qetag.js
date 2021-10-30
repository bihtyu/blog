// const sha1 = require('sha1')
// const shA1 = require('sha1-digest')().digest;

// function getEtag(buffer, callback) {
//   // var shA1 = sha1.digest
//   // var shA1 = sha1.digest

//   var blockSize = 4 * 1024 * 1024
//   var sha1String = []
//   var prefix = 0x16
//   var blockCount = 0

//   var bufferSize = buffer.size || buffer.length || buffer.byteLength
//   blockCount = Math.ceil(bufferSize / blockSize)

//   for (var i = 0; i < blockCount; i++) {
//     sha1String.push(shA1(buffer.slice(i * blockSize, (i + 1) * blockSize)))
//   }

//   function concatArr2Unit8(s) {
//     var tmp = []
//     for (var i of s) tmp = tmp.concat(i)
//     return new Uint8Array(tmp)
//   }

//   function Unit8ToBase64(u8Arr, urisafe) {
//     var CHUNK_SIZE = 0x8000
//     var index = 0
//     var length = u8Arr.length
//     var result = ''
//     var slice
//     while(index < length) {
//       slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length))
//       result += String.fromCharCode.apply(null, slice)
//       index += CHUNK_SIZE
//     }
//     return urisafe ? btoa(result).replace(/\//g, '_').replace(/\+/g, '_') : btoa(result)
//   }

//   function calcEtag() {
//     if (!sha1String.length) return 'Fto5o-5ea0sNMlW_75VgGJCv2AcJ'
//     var sha1Buffer = concatArr2Unit8(sha1String)
//     if (blockCount > 1) {
//       prefix = 0x96
//       sha1Buffer = shA1(sha1Buffer.buffer)
//     } else {
//       sha1Buffer = Array.apply([], sha1Buffer)
//     }
//     sha1Buffer = concatArr2Unit8([[prefix], sha1Buffer])
//     return Unit8ToBase64(sha1Buffer, true)
//   }
//   let a = calcEtag()
//   console.log(a)
//   return a
// }

// // module.exports = {
// //   getEtag: getEtag,
// //   test: '123123'
// // }

// exports.getEtag = getEtag


function getEtag(buffer,callback){

	// 判断传入的参数是buffer还是stream还是filepath
	var mode = 'buffer';

	if(typeof buffer === 'string'){
		buffer = require('fs').createReadStream(buffer);
		mode='stream';
	}else if(buffer instanceof require('stream')){
		mode='stream';
	}

	// sha1算法
	var sha1 = function(content){
		var crypto = require('crypto');
		var sha1 = crypto.createHash('sha1');
		sha1.update(content);
		return sha1.digest();
	};

	// 以4M为单位分割
	var blockSize = 4*1024*1024;
	var sha1String = [];
	var prefix = 0x16;
	var blockCount = 0;

	switch(mode){
		case 'buffer':
			var bufferSize = buffer.length;
			blockCount = Math.ceil(bufferSize / blockSize);

			for(var i=0;i<blockCount;i++){
				sha1String.push(sha1(buffer.slice(i*blockSize,(i+1)*blockSize)));
			}
			process.nextTick(function(){
				callback(calcEtag());
			});
			break;
		case 'stream':
			var stream = buffer;
			stream.on('readable', function() {
				var chunk;
				while (chunk = stream.read(blockSize)) {
					sha1String.push(sha1(chunk));
					blockCount++;
				}
			});
			stream.on('end',function(){
				callback(calcEtag());
			});
			break;
	}

	function calcEtag(){
		if(!sha1String.length){
			return 'Fto5o-5ea0sNMlW_75VgGJCv2AcJ';
		}
		var sha1Buffer = Buffer.concat(sha1String,blockCount * 20);

		// 如果大于4M，则对各个块的sha1结果再次sha1
		if(blockCount > 1){
			prefix = 0x96;
			sha1Buffer = sha1(sha1Buffer);
		}

		sha1Buffer = Buffer.concat(
			[new Buffer([prefix]),sha1Buffer],
			sha1Buffer.length + 1
		);

		return sha1Buffer.toString('base64')
			.replace(/\//g,'_').replace(/\+/g,'-');

	}

}

module.exports = getEtag;