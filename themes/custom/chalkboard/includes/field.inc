<?php

/**
 * @file
 * Theme and preprocess functions for fields.
 */

/**
 * Implements THEME_preprocess_HOOK() for field.html.twig.
 *
 * @see hook_preprocess_HOOK()
 * @see template_preprocess_field()
 */
function chalkboard_preprocess_field(&$variables) {
  $element = $variables['element'];

  // Provide bundle and view mode for BEM components classes approach
  $variables['bundle'] = $element['#bundle'];
  // @todo check if it stay consitent with nested fields
  $variables['view_mode'] = $element['#view_mode'];
}
