<?php
/**
 * @file
 * Theme functions for chalk.
 */

/**
 * Get theme functionalities.
 */
function chalk_get_theme(&$variables) {
  chalk_add_libraries($variables);
}

/**
 * Add libraries to the theme.
 */
function chalk_add_libraries(&$variables) {
  // @todo disable the whole library defined in chalk.libraries if the field is empty
  // @todo put the whole javascript code in files for allowing linting and caching
  // @todo fetch variables in those javascript files
  $typekit_id = theme_get_setting('typekit_id');
  if (!empty($typekit_id)) {
    $variables['typekit_id'] = theme_get_setting('typekit_id');
  }
}
