#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# Navigate to the blog directory
cd my-blog

# Configure bundler to use a local vendor path
bundle config set --local path 'vendor/bundle'

# Install dependencies
bundle install

# Start the Jekyll server in the background
bundle exec jekyll serve --host=0.0.0.0 > ../jekyll_output.log 2>&1 &