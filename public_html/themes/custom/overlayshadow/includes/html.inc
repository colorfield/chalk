<?php

/**
 * @file
 * Theme and preprocess functions for html.
 */

/**
 * Implements hook_html_head_alter().
 */
function overlayshadow_html_head_alter(&$head_elements) {

  // HTML5 charset declaration.
  $head_elements['system_meta_content_type']['#attributes'] = array(
    'charset' => 'utf-8',
  );

  // Optimize mobile viewport.
  $head_elements['mobile_viewport'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'viewport',
      'content' => 'width=device-width, initial-scale=1',
    ),
  );
}

/**
 * Preprocess variables for html templates.
 *
 * @param $variables
 */
function overlayshadow_preprocess_html(&$variables) {
  // Add libraries.
  overlayshadow_get_theme($variables);

  // Add page classes.
  $path = \Drupal::service('path.current')->getPath();
  $path_args = explode('/', $path);
  if (isset($path_args[1]) && isset($path_args[2]) && ($path_args[1] == 'node') && (is_numeric($path_args[2]))) {
    $variables['attributes']['class'][] = 'page-node-' . $path_args[2];
  }
  if (isset($path_args[1]) && isset($path_args[2]) && ($path_args[1] == 'taxonomy') && ($path_args[2] == 'term') && (is_numeric($path_args[3]))) {
    $variables['attributes']['class'][] = 'page-taxonomy-' . $path_args[3];
  }

  // Add Apple touch icons
  // @see http://drupal.stackexchange.com/questions/12834/change-default-favicon-programmatically
  $favicon_path = base_path() . drupal_get_path('theme', 'overlayshadow') . '/images/favicons/';

  $apple_icon_sizes = array(72, 114, 144, 180);
  foreach ($apple_icon_sizes as $size) {
    $apple_icon = array(
      '#tag' => 'link',
      '#attributes' => array(
        'href' => file_create_url($favicon_path . 'apple-touch-icon-' . $size . 'x' . $size . '.png'),
        'rel' => 'apple-touch-icon',
        'sizes' => $size . 'x' . $size,
      ),
      '#weight' => 8888,
    );
    $variables['#attached']['html_head'][] = [$apple_icon, 'favicon-' . $size];
  }

  // Add meta theme-color
  // @see http://updates.html5rocks.com/2014/11/Support-for-theme-color-in-Chrome-39-for-Android
  if (theme_get_setting('meta_theme_color')) {
    $meta_theme_color = array(
      '#tag' => 'meta',
      '#attributes' => array(
        "name" => "theme-color",
        "content" => theme_get_setting('meta_theme_color'),
      ),
      '#weight' => -1,
    );
    $variables['#attached']['html_head'][] = [$meta_theme_color, 'meta_theme_color'];
  }

}
