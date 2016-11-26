<?php

/**
 * @file
 * Theme functions for chalkboard.
 */

/**
 * Get theme functionalities.
 */
function chalkboard_get_theme(&$variables) {
  chalkboard_add_libraries($variables);
}

/**
 * Add libraries to the theme.
 *
 * @todo disable the whole library defined in chalkboard.libraries if the field is empty
 * @todo put the whole javascript code in files for allowing linting and caching
 * @todo fetch variables in those javascript files
 */
function chalkboard_add_libraries(&$variables) {
  $typekit_id = theme_get_setting('typekit_id');
  if (!empty($typekit_id)) {
    $variables['typekit_id'] = theme_get_setting('typekit_id');
  }
}
