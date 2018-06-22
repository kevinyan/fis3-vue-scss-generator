/* eslint-disable */
fis.set('namespace', 'demo');

fis.hook('commonjs');
fis.unhook('components');
fis.unhook('node_modules');


//  所有开启mod,同名依赖，转为Js
fis.match('*/**.{js,jsx}', {
    useSameNameRequire: true,
    rExt: '.js',
    isMod: true
}).match('lib/mod.js', {
    isMod: false
})

//release规则
fis.match('**/*.{scss,sass}', {
    rExt: '.css',
    parser: fis.plugin('node-sass', {
        include_paths: [
            './lib/*.sass'
        ]
    }),
    relative: true,
    optimizer: fis.plugin('clean-css')
});


fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
    })
});

