# Demo脚手架


### 视觉方案 && 规范
> 视觉开发建议统一使用scss开发，`include/sass`文件夹中放一些公共样式`mixin`和`placeholder`

> 视觉方案统一使用rem单位布局，字号也统一使用rem单位，数值直接填入1242像素视觉标注的数值即可，demo如下：

```
    .test {
        width: rem(100px);
        font-size: rem(48px);
    }

    // 命名风格采用小写字母、短线连接的方式，栗子：
    .mod {
        // some styles for .mod ...

        &-header {
            // some styles for .mod-header ...
        }

        &-body {
            // some styles for .mod-body ...
        }

        &-footer {
            // some styles for .mod-footer ...
        }
    }

    // 1px边框，详见`include/sass/_mixins.scss`
    .boder-bottom {
        @include hairline(h, #e0e0e0);
    }
```

> 图片压缩：添加images文件夹的图片时，可以使用TinyPNG4Mac工具（500 pics/key），下载地址：

> https://github.com/kyleduo/TinyPNG4Mac

> TinyPNG API Key：I7F7GEIot72VUdsechdnPrbNkL1qW4O5