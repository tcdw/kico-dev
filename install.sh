#!/usr/bin/env bash
templates_name="kico"
if [ $(basename `pwd`) != "templates" ];then
    echo "[Error] Please do this in the templates directory!"
    exit
fi
if [ ! -d ${templates_name} ]; then
    git clone https://github.com/SilverBlogTeam/${templates_name}.git
fi
ln -sv ../${templates_name}/static ./static/${templates_name}
cd ${templates_name}
if [ -f "config.json" ]; then
    cp config.example.json config.json
    vim config.json
fi
