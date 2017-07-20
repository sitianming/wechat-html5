#!/bin/bash
echo please input your selected:
echo "1. auto git deploy_debug 部署到线上测试环境"
echo "2. auto git deploy       部署到线上生产环境"
echo "3. local deploy 本地部署"
echo "4. new git deploy_debug 第一次建立deploy_debug"
echo "5. new git deploy 第一次建立deploy"
read select
case $select in
        1) 
                git st #确认干净
                git checkout deploy_debug
                git merge master
                git push origin deploy_debug  
                git checkout master
                ;;
        2) 
                git st #确认干净
                git checkout deploy
                git merge master
                git push origin deploy
                git checkout master
                ;;
        3) 
                php artisan migrate --force
                grunt --force
                ;;
        4) 
                git st #确认干净
                git checkout -b deploy_debug
                git push -u origin deploy_debug  
                git checkout master
                ;;
        5) 
                git st #确认干净
                git checkout -b deploy
                git push -u origin deploy
                git checkout master
                ;;
        *) 
                echo you select nothing
                ;;
esac



