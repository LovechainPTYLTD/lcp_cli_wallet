# command line wallet for LCP
## can be used as a full node or a light client
# LCP网络的命令行钱包。 
## 可以部署为完整节点或轻客户端。
## Server Initial Cloud Setup
## 服务器初始云设置

The ideal server operating system would be `Ubuntu Server 16.04 LTS` with at least
4 Gigabytes of RAM.

理想的服务器操作系统至少是 `Ubuntu Server 16.04 LTS`
4 GB的RAM。

Your security group should be setup to receive inbound traffic from `SSH` and `HTTP` at a port of your choosing. The default ports should be fine. The security group will allow traffic from the HTTP port to reach your reverse proxy (`nginx`) that will be installed later on the server.  This reverse proxy will forward the data to your operational NodeJS server.

您的安全组应设置为在您选择的端口从 `SSH` 和 `HTTP` 接收入站流量。 默认端口应该没问题。 安全组将允许来自HTTP端口的流量到达您稍后将在服务器上安装的反向代理（`nginx`）。 此反向代理将数据转发到您的运行NodeJS服务器。
```
.............
. world世界  .
.............
      |
      |
  `BLOCKED屏蔽`
      |
      |
.............           .................
.  node节点  . <- - - >  .  your servers你的服务器 .
.............           .................
```


Since this server should not have any communications with the outside world it would be advised to setup your security group to only allow connections from particular IP addresses.

由于此服务器不应与外界进行任何通信，因此建议将安全组设置为仅允许来自特定IP地址的连接。

## Server Software Installation
## 服务器软件安装
### Preliminary Preparations
### 初步准备

`sudo apt-get update`
`sudo apt-get upgrade`
`sudo apt-get install python build-essential -y`

### NodeJS Version management (NVM)
### NodeJS版本管理（NVM）
run this command first:
首先运行此命令：:

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash`

after installation is complete send these three commands:
安装完成后发送以下三个命令：
`export NVM_DIR="$HOME/.nvm"`
`[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`
`[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"`

verify your `nvm` installation with this command:
使用以下命令验证您的` nvm `安装：

`nvm -v`

if everything is okay then we use `nvm` to install `NodeJS`
如果一切正常，那么我们使用` nvm `来安装` NodeJS `

### NodeJS Installation NodeJS 安装
<span style="color:red">_do not install the latest version of node_</span>
<span style="color:red">_不要安装最新版本的NodeJS_</span>
use `nvm` to install NodeJS version `8.9.4`:
使用 `nvm` 安装 `NodeJS` 版本 `8.9.4`：

`nvm install 8.15.0`

after `NodeJS version 8.15.` has been successfully installed run this:
在 `NodeJS配件8.15.0` 成功安装后运行：

`npm install node-gyp -g`

### Wallet installation
### 钱包安装
`git clone https://github.com/LovechainPTYLTD/lcp_cli_wallet.git`


`cd lcp_cli_wallet`


`npm install`

## Getting private key
the private key is made automatically by the server on first start.
私钥是由服务器在第一次启动时自动生成的。
to start the server run this command:
启动服务器运行此命令：
`node start.js`

on first run, the program will ask for a password. type a password here and remember it. it is not saved.
在第一次运行时，程序将要求输入密码。 在这里输入密码并记住它。 它没有保存。

to run in the background press `ctrl - Z` then type `bg`
在后台运行按 `ctrl-Z` 然后输入 `bg`
then type `jobs` find the job running on your server. should be just one.
然后输入 `jobs` 找到在您的服务器上运行的任务。 应该只是一个。

to daemonize process:
维护进程：
`disown %1` <--- `%1` is the default but for your system it may be a different number. you will know for sure when you run the `jobs` command. 这是默认值，但对于您的系统，它可能是不同的值。 当你运行 `jobs` 命令时，你肯定会知道。

to kill a server type:
停止服务器:
`ps -aux | grep node`

find the process ID then type:
找到进程ID然后键入:
`kill -9 PSID` where PSID is the process ID which you would get from `ps -aux | grep node` PSID是您从` ps -aux |获得的进程ID grep节点`

### Starting the server
### 开始节点
type:
输入：
`node start.js`

### Starting RPC service
### 开始RPC服务：
`do not` type :
`别`输入：
`node start.js`

instead type:
输入：
`node tools/rpc_service.js`

then enter your password
然后输入你的密码

### Stopping the server
### 停住服务器

to kill a server type:
停止服务器:
`ps -aux | grep node`

find the process ID then type:
找到进程ID然后键入:
`kill -9 PSID` where PSID is the process ID which you would get from `ps -aux | grep node` PSID是您从` ps -aux |获得的进程ID grep节点`
