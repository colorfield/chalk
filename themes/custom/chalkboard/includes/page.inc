<?php

/**
 * @file
 * Theme and preprocess functions for page.
 */

/**
 * Implements template_preprocess_HOOK().
 */
/*
function chalkboard_preprocess_page(&$vars) {
  // Define a page template accessible logo path variable
  $vars['logopath'] = '/' . drupal_get_path('theme','chalkboard') . '/logo.svg';
}
*/

/**
 * Implements HOOK_theme_suggestions_page_alter().
 */
/*
function chalkboard_theme_suggestions_page_alter
(array &$suggestions, array $variables) {
  // Add custom template suggestion for specific nodes pages
  if ($node = \Drupal::routeMatch()->getParameter('node')) {
    $content_type = $node->bundle();
    $suggestions[] = 'page__'.$content_type;
  }
}
*/
