# 视频插件 vue-video-player 使用总结
近日，在一个 vue 项目中需要使用视频播放插件，网上推荐 vue-video-player， 以下为使用过程以及遇到的坑
1. 安装
    ```
    npm install vue-video-player
    ```
2. 引入
    在 main.js 中引入
    ```
    import VideoPlayer from 'vue-video-player'
    Vue.use(VideoPlayer)
    ```
    在需要用的地方引入样式
    ```
    require('video.js/dist/video-js.css')
    require('vue-video-player/src/custom-theme.css')
    ```
3. demo  
    html
    ```
    <video-player class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options='playerOptions'
        ></video-player>
    ```
    script中添加 data playerOptions
    ```
    playerOptions: {
      playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
      autoplay: false, // 如果true,浏览器准备好时开始回放。
      muted: false, // 默认情况下将会消除任何音频。
      loop: false, // 导致视频一结束就重新开始。
      preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
      language: 'zh-CN',
      aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
      fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
      sources: [{
        type: '',
        src: 'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=152146&resourceType=video&editionType=high&source=aliyun' // url地址
      }],
      poster: 'http://img.kaiyanapp.com/bead468d33e92566b8698c6bdf224fd4.png?imageMogr2/quality/60/format/jpg', // 你的封面地址
      // width: document.documentElement.clientWidth,
      notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      controlBar: {
        timeDivider: true,
        durationDisplay: true,
        remainingTimeDisplay: false,
        fullscreenToggle: true // 全屏按钮
      }
    }
    ```


4. url地址问题  
    现在很多视频地址都是通过解析到 aliyun 或 UCCloud 上，问题是直接使用未解析的地址会报下面的错  

    ![images](https://github.com/bihtyu/Blog/blob/master/images/vue-video-player__%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E9%94%99%E8%AF%AF.png)

    换成解析后的地址可以正常播放，如下：
    ```
    src: 'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=152146&resourceType=video&editionType=high&source=aliyun' // 原地址
    src: 'http://uc.cdn.kaiyanapp.com/1552294594893_f1cf4fd2.mp4?t=1552380554&k=d03b6eec8ce20d17' // 解析后的地址
    ```

    考虑到不可能每个地址都手动转换，查阅 [vue-video-player 的 GitHub](https://github.com/surmon-china/vue-video-player) 和 [demo](https://surmon-china.github.io/vue-video-player/) 后得知，可以手动设置 sources 的 type 属性，使其自动解析:
    ```
    sources: [{
        type: 'video/mp4',
        src: 'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=152146&resourceType=video&editionType=high&source=aliyun' // url地址
      }]
```
