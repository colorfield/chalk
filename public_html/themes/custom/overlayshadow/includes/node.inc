<?php

/**
 * @file
 * Theme and preprocess functions for node.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
/*
function overlayshadow_theme_suggestions_node_alter(array &$suggestions, array $variables) {
  // Provide a template suggestion for a Node Activity depending on its field activity type
  $suggestions[] = 'block__light';
  $field_activity_type = $variables['elements']['field_activity_type'][0]['#title'];
  if(isset($field_activity_type)){
    $field_activity_type_class = Html::cleanCssIdentifier('fezf');
    dsm($field_activity_type_class);
  }

  $css_file_name = 'specific-page';
  $clean_alias = Html::cleanCssIdentifier($css_file_name);
}
*/
