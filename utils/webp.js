function checkWebp() {
  try {
    return document.createElement('canvas')
          .toDataURL('image/webp')
          .indexOf('data:image/webp') === 0
  } catch(e) {
    return false
  }
}

const isSupportWebp = checkWebp()

export const getWebpImageUrl = function(url) {
  if (!url) {
    throw Error('图片 url 不能为空')
  }
  if (url.startsWith('data:') || !isSupportWebp) {
    return url
  }
  return url + '?oss-xxx.com'
}