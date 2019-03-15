#### Nginx 常用命令
```
重启服务
# ./usr/local/src/nginx-1.14.0/objs/nginx -s reload
```

#### 找不到nginx.pid
```
修改下面路径为自己服务器 Nginx 安装路径，执行
/usr/local/src/nginx-1.14.0/objs/nginx -c /usr/local/src/nginx-1.14.0/conf/nginx.conf
```

#### 上传文件到服务器
通过 Xshell 6 和 lrzsz 上传文件到服务器
```
yum   -y  install  lrzsz
rz -y
```

通过命令行上传 文件夹 到服务器
```
// dist 为当前路径下的文件夹
scp -r dist root@47.112.197.119:/www/test
```

通过命令行上传 文件 到服务器
```
scp dist/index.html root@47.112.197.119:/www/test
```
