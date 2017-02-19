<?php

/**
 * @file
 * Theme and preprocess functions for block.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
/*
function overlayshadow_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  // Set bare blocks template
  // Try extending block--bare.html.twig instead
  dsm($plugin_id);
  $plugin_id = $variables['elements']['#base_plugin_id'];
  $bare_blocks = array(
                      "system_branding_block",
                      );
  if (in_array($plugin_id, $bare_blocks)) {
    $suggestions[] = 'block__bare';
  }

  // Set custom classes based on the region
  $block_id = $variables['elements']['#id'];
  $block = \Drupal\block\Entity\Block::load($block_id);
  $region = $block->getRegion();

  switch ($region) {
    case 'aside':
      $vars['classes_array'][] = 'block__aside';
      break;
    default:
      break;
  }
}
*/
