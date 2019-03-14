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

#### 通过 Xshell 6 和 lrzsz 上传文件到服务器
```
yum   -y  install  lrzsz
rz -y
```
