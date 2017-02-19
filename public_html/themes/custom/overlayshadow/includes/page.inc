<?php

/**
 * @file
 * Theme and preprocess functions for page.
 */

/**
 * Implements template_preprocess_HOOK().
 */
/*
function overlayshadow_preprocess_page(&$vars) {
  // Define a page template accessible logo path variable
  $vars['logopath'] = '/' . drupal_get_path('theme','overlayshadow') . '/logo.svg';
}
*/

/**
 * Implements HOOK_theme_suggestions_page_alter().
 */
/*
function overlayshadow_theme_suggestions_page_alter
(array &$suggestions, array $variables) {
  // Add custom template suggestion for specific nodes pages
  if ($node = \Drupal::routeMatch()->getParameter('node')) {
    $content_type = $node->bundle();
    $suggestions[] = 'page__'.$content_type;
  }
}
*/
