<?php

/**
 * @file
 * Theme and preprocess functions for page.
 */

/**
 * Implements template_preprocess_HOOK().
 */
/*
function chalk_preprocess_page(&$vars) {
  // Define a page template accessible logo path variable
  $vars['logopath'] = '/' . drupal_get_path('theme','chalk') . '/logo.svg';
}
*/

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
// function chalk_theme_suggestions_page_alter(array &$suggestions, array $variables) {
  // Add custom template suggestion for specific nodes
  // if ($node = \Drupal::routeMatch()->getParameter('node')) {
  //   $content_type = $node->bundle();
  //   $suggestions[] = 'page__'.$content_type;
  // }
// }
