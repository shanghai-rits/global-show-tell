
如何run app: 
1. 打开UI文件夹  ```cd web-ui```
2. 安装dependencies:
   ```nvm use```  (use the required node version)
  ``` npm install```
3. Run on your local:
   ```npm run dev```
   
  VITE v6.0.6  ready in 373 ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

4. Go to http://localhost:5174/ to see the app running
   

如何deploy:
1. pull repo到本地，新建branch，修改code
2. npm run build
3. npm run preview -> 在本地查看&测试
4. npm run deploy -> 部署到github pages  (在这里查看https://github.com/shanghai-rits/global-show-tell/actions)
5. 打开网站查看更新 https://github.com/shanghai-rits/global-show-tell/settings/pages
   Your site is live at https://nyuglobal.show/
6. commit, create PR -> push 代码 
