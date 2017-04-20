FROM jekyll/jekyll:pages

COPY Gemfile* /tmp/
WORKDIR /tmp
RUN bundle install