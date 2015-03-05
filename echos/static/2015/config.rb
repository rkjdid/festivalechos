# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
environment = :production
output_style = (environment == :production) ? :compressed : :expanded

http_path = "/static/"
css_dir = "css"
sass_dir = "scss"
images_dir = "img"
javascripts_dir = "js"
fonts_dir = "font"

asset_cache_buster :none

sass_options = {:cache => false}
