# This file is only used if you use `make publish` or
# explicitly specify it as your config file.

import os
import sys

sys.path.append(os.curdir)
import pelicanconf as _pelicanconf

for _name in dir(_pelicanconf):
    if not _name.startswith("_"):
        globals()[_name] = getattr(_pelicanconf, _name)

# If your site is available via HTTPS, make sure SITEURL begins with https://
SITEURL = "https://diversity.python.org"
RELATIVE_URLS = False

FEED_ALL_ATOM = "feeds/all.atom.xml"
CATEGORY_FEED_ATOM = "feeds/{slug}.atom.xml"

DELETE_OUTPUT_DIRECTORY = True

# Following items are often useful when publishing
# DISQUS_SITENAME = ""
# GOOGLE_ANALYTICS = ""
