REM docker run --rm --name dj-blog -e http_proxy=http://proxy.ch.intel.com:911 -e https_proxy=http://proxy.ch.intel.com:911 -v "/mnt/hgfs/personal/jekyll/digitaldrummerj.github.io":/srv/jekyll -p "4000:4000" digitaldrummerj:ghpages bundle exec jekyll serve --config _config.yml,_config_docker.yml --drafts --force_polling --incremental --limit_posts 5 -V


docker run --rm --name dj-blog -v "/mnt/hgfs/personal/jekyll/digitaldrummerj.github.io":/srv/jekyll -p "4000:4000" digitaldrummerj:ghpages bundle exec jekyll serve --config _config.yml,_config_docker.yml --force_polling --incremental --limit_posts 1
