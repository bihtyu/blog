## Linux 常用命令
#### 上传文件到服务器
通过 Xshell 6 和 lrzsz 上传文件到服务器的当前目录
```
yum   -y  install  lrzsz
rz -y

rz (注：在 MobaXterm 下，rz -> Ctrl + 右键 -> 选择【Send file using Z-modem】 )
```

通过命令行上传 文件夹 到服务器
```
// dist/static 为当前路径下的文件夹
scp -r dist/static root@47.112.197.119:/www/test
```

通过命令行上传 文件 到服务器
```
scp dist/index.html root@47.112.197.119:/www
```
#### 防火墙开启相关端口
```
firewall-cmd --add-port=3000/tcp --permaent
firewall-cmd --reload
firewall-cmd --zone=public --list-all
```


## Nginx 常用命令
#### 找不到nginx.pid
```
修改下面路径为自己服务器 Nginx 安装路径，执行
/usr/local/src/nginx-1.14.0/objs/nginx -c /usr/local/src/nginx-1.14.0/conf/nginx.conf
```

```
重启服务
# ./usr/local/src/nginx-1.14.0/objs/nginx -s reload
```

#### 找不到nginx.pid
```
修改下面路径为自己服务器 Nginx 安装路径，执行
/usr/local/src/nginx-1.14.0/objs/nginx -c /usr/local/src/nginx-1.14.0/conf/nginx.conf
```
#### hash -> history 引起的页面 404
在 nginx.conf 中添加以下配置：
```
location /{
    root   /data/nginx/html;
    index  index.html index.htm;
    if (!-e $request_filename) {
        rewrite ^/(.*) /index.html last;
        break;
    }
```