<?php

namespace Drupal\dimension\Plugin\Field;

trait LengthTrait {

  public static function fields() {
    return array(
      'length' => t('Length'),
    );
  }

}
