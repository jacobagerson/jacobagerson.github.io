#!/bin/bash
git add .
git commit -m "Site update: $(date)"
git push origin master
echo "🚀 Changes pushed! Site will update in ~1 minute."