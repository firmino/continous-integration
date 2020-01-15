
# Passos para configurar o servidor

1. ssh -i tutorial-cd firminodefaria@34.68.183.215\
2. npm install pm2 -g \
3. mkdir projeto-teste\
4. git init --bare ~/projeto-teste.git\
5. Configure projeto-teste.git/hooks/post-receive (olhar script abaixo) \
6. Adicione sua chave caso não seja a default `ssh-add tutorial-cd`\
7. Adicioner o servidor como remote `git remote add deploy firminodefaria@34.68.183.215:/home/firminodefaria/projeto-teste.git`\
8. Faça o deploy no servidor `git push deploy dev`



```bash

TARGET="/home/firminodefaria/projeto-teste"
GIT_DIR="/home/firminodefaria/projeto-teste.git"
BRANCH="dev"

cd $TARGET
git --work-tree=$TARGET --git-dir=$GIT_DIR checkout -f $BRANCH

echo 'post-receive: npm install�~@�'
npm -v\
npm install \
&& echo 'pm2 deleting projeto-teste' \
&& (pm2 delete 'projeto-teste' || true) \
&& echo 'pm2 starting projeto-teste' \
&& pm2 start npm --name 'projeto-teste' -- start \
&& echo �~@~Xpost-receive: app started successfully with pm2.





```

# Passos para configurar o github actions

1. no projeto git criar a pasta `.github/workflows`
2. criar um arquivo chamado dev-cd-workflow.yml
3. adicionar os segredos no projeto
4. adicionar o seguinte conteúdo no arquivo de workflow

```
name: Continous Deployment Dev

on: 
  push:
    branches:
      - dev
  pull_request:
    branches:
      - dev

jobs: 
  linux:
    name: DEV PROJECT DEPLOY
    runs-on: ubuntu-latest

    steps:

      - uses: actions/checkout@v1

      - name: Install private SSH key
        uses: shimataro/ssh-key-action@v1
        with:
          private-key: ${{ secrets.SSH_PRIVATE_KEY }}
          public-key: ${{ secrets.SSH_PUBLIC_KEY }}

      - name: Adding server in known_hosts
        run: 
          ssh-keyscan -t rsa -H ${{ secrets.KNOWN_HOSTS}} >> ~/.ssh/known_hosts

      - name: Add git remote
        run: 
          git remote add deploy ${{ secrets.DEPLOY_URL_DEV}}

      - name: Push dev to server
        run: 
          git push deploy  HEAD:dev  
```

