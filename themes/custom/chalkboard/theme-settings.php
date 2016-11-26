<?php

/**
 * @file
 * General theme settings elements.
 *
 * Implements hook_form_system_theme_settings_alter().
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */

function chalkboard_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {
  global $theme_path;

  $styleguide_path = base_path() . drupal_get_path('theme', 'chalkboard') .'/styleguide/index.html';
  $form['chalkboard_styleguide'] = array(
    '#title'         => '&#9733; ' . t('Styleguide'),
    '#description' => t('A <a href="@link">living style guide</a> generated from the theme stylesheet. Developers, use it for finding components markup and modifiers. Themers, use it for styling and maintaining custom components.', array('@link' => $styleguide_path)),
    '#type'          => 'fieldset',
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
    '#weight'=> -20
  );

  $form['chalkboard_typekit'] = array(
    '#type' => 'fieldset',
    '#title'         => '&#3845; ' . t('Typekit'),
  );

  $form['chalkboard_typekit']['typekit_id'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Typekit ID'),
    '#description'   => t('E.g. http://use.typekit.com/XXX.js (the typekit codes will be included only if this field is filled)'),
    '#default_value' => theme_get_setting('typekit_id'),
    '#size' => 8,
  );

  /**
   * Cool Stuff
   */
  $form['stuff'] = array(
      '#type'          => 'fieldset',
      '#title'         => '&#9996; ' . t('Stuff'),
      '#description'   => '',
      '#collapsible' => TRUE,
      '#collapsed' => FALSE,
      '#weight'=> -17
  );

  $form['stuff']['meta_theme_color'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Theme color meta tag'),
    '#attributes'   => array('placeholder' => array('#ccc')),
    '#description'   => t('Use the <a href="@link">theme-color</a> meta tag to set the toolbar color (starting in version 39 of Chrome for Android on Lollipop)', array('@link' => 'http://updates.html5rocks.com/2014/11/Support-for-theme-color-in-Chrome-39-for-Android')),
    '#default_value' => theme_get_setting('meta_theme_color')
  );

}
