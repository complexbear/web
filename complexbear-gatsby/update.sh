#!/bin/bash
rsync -avr --delete public/* web@complexbear:/srv/www/blog
