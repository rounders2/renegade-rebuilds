# Renegade Rebuilds

Static HTML/CSS/JS rebuild of the Renegade Rebuilds espresso machines site (originally WordPress), built for GitHub Pages hosting.

## File structure

```
index.html
styles.css
script.js
assets/
  images/
    logo.png
    favicon.png
    hero-1.jpg, hero-2.jpg, hero-3.jpg
    bg-fantastiko.jpg, bg-frank.jpg, bg-chopped.jpg, bg-walnut.jpg, bg-contact.jpg
    about.png
    fantastiko/  featured.jpg, featured-hover.png, 01.jpg ... 17.jpg
    frank/       featured.jpg, featured-hover.png, 02.jpg ... 10.jpg
    chopped/     featured.jpg, featured-hover.png, 02.jpg ... 11.jpg
    walnut/      featured.jpg, featured-hover.png, 02.jpg ... 13.jpg
```

## Adding the images

The code references the images above, but the binary files are **not** included in this
repo yet. Grab the originals from the WordPress Media Library (or your host's file
manager / FTP, under `wp-content/uploads/`) and save each one into
`assets/images/` using the exact filename shown. Search the Media Library by the
original filename fragment listed below (the WP media library lets you search by name).

### Logo / favicon / hero / backgrounds / about

| Save as | Original WordPress file (search Media Library for this name) |
|---|---|
| logo.png | renegade_rebuilds_logo_bold |
| favicon.png | renegade_rebuilds_favicon |
| hero-1.jpg | renegade_rebuilds_nelson_bc_espresso_header1-1_shrink |
| hero-2.jpg | working_on_espresso_machine2 |
| hero-3.jpg | renegade_fb_cover4 |
| bg-fantastiko.jpg | fantastiko_coloredBG |
| bg-frank.jpg | Frank_colorBG |
| bg-chopped.jpg | chopped_colorBG |
| bg-walnut.jpg | walnut_colorBG |
| bg-contact.jpg | renegade_rebuilds_contact_plate |
| about.png | 450_block |

### Fantastiko Magic Box (assets/images/fantastiko/)

| Save as | Original file |
|---|---|
| featured.jpg | magicbox_perspective |
| featured-hover.png | fantastiko_diff |
| 01.jpg | magicbox_espresso_machine_0007 |
| 02.jpg | magicbox_espresso_machine_0006 |
| 03.jpg | magicbox_espresso_machine_0005 |
| 04.jpg | magicbox_espresso_machine_0004 |
| 05.jpg | magicbox_espresso_machine_0001 (the "1-2-1" variant) |
| 06.jpg | magicbox_espresso_machine_0000 (the "1-1-1" variant) |
| 07.jpg | magicbox_espresso_machine_0003 |
| 08.jpg | magicbox_espresso_machine_0002 |
| 09.jpg | magicbox_espresso_machine_0001 (the "1-2" variant) |
| 10.jpg | magicbox_espresso_machine_0000 (the "1-1" variant) |
| 11.jpg | renegade_rebuilds_espresso_machine_magicbox-8 |
| 12.jpg | renegade_rebuilds_espresso_machine_magicbox-7 |
| 13.jpg | renegade_rebuilds_espresso_machine_magicbox-6 |
| 14.jpg | renegade_rebuilds_espresso_machine_magicbox-4 |
| 15.jpg | renegade_rebuilds_espresso_machine_magicbox-3 |
| 16.jpg | renegade_rebuilds_espresso_machine_magicbox-5_warm |
| 17.jpg | renegade_rebuilds_espresso_machine_magicbox-2 |

### Rusty Frankenstein (assets/images/frank/)

| Save as | Original file |
|---|---|
| featured.jpg | frank_featured_normal |
| featured-hover.png | rustyFrankenstein |
| 02.jpg | frank_blk_20 |
| 03.jpg | frank_blk_21 |
| 04.jpg | frank_blk_9 |
| 05.jpg | frank_blk_10 |
| 06.jpg | frank_blk_11 |
| 07.jpg | frank_blk_16 |
| 08.jpg | frank_blk_17 |
| 09.jpg | frank_blk_14 |
| 10.jpg | frank_blk_12 |

(Note: the gallery's "01" slot reuses featured.jpg automatically in the HTML — no separate file needed.)

### Chopped n' Modified Z11 (assets/images/chopped/)

| Save as | Original file |
|---|---|
| featured.jpg | largeFeaturedImage_design2 |
| featured-hover.png | chopped_diff |
| 02.jpg | chopped-modified-z11-espresso-machine_0004 |
| 03.jpg | chopped-modified-z11-espresso-machine_0005 |
| 04.jpg | chopped-modified-z11-espresso-machine_0006 |
| 05.jpg | chopped-modified-z11-espresso-machine_0007 |
| 06.jpg | chopped-modified-z11-espresso-machine_0009 |
| 07.jpg | chopped-modified-z11-espresso-machine_0008 |
| 08.jpg | chopped-modified-z11-espresso-machine_0013 |
| 09.jpg | chopped-modified-z11-espresso-machine_0011 |
| 10.jpg | chopped-modified-z11-espresso-machine_0010 |
| 11.jpg | chopped-modified-z11-espresso-machine_0001 |

(The "01" slot reuses featured.jpg automatically.)

### Walnut Wood Windows (assets/images/walnut/)

| Save as | Original file |
|---|---|
| featured.jpg | Walnut_largeFeatured_Design2 |
| featured-hover.png | walnut_diff |
| 02.jpg | wicked_walnut_espresso_machine_5 |
| 03.jpg | wicked_walnut_espresso_machine_13 |
| 04.jpg | wicked_walnut_espresso_machine_4 |
| 05.jpg | wicked_walnut_espresso_machine_1 |
| 06.jpg | wicked_walnut_espresso_machine_3 |
| 07.jpg | wicked_walnut_espresso_machine_2 |
| 08.jpg | wicked_walnut_espresso_machine_6 |
| 09.jpg | wicked_walnut_espresso_machine_12 |
| 10.jpg | wicked_walnut_espresso_machine_11 |
| 11.jpg | wicked_walnut_espresso_machine_10 |
| 12.jpg | wicked_walnut_espresso_machine_8 |
| 13.jpg | wicked_walnut_espresso_machine_7 |

(The "01" slot reuses featured.jpg automatically.)

## Contact form

The original Contact Us form was replaced with a placeholder. In `index.html`,
find the element with `id="contact-form-embed"` inside the Contact section and
replace its contents with your embed code (Formspree, Tally, JotForm, etc.).

## GitHub Pages

Enabled via **Settings → Pages**, deploying from the `main` branch root. Once a
custom domain is ready, add it in the same Pages settings screen and create a
`CNAME` file at the repo root with the domain name.
