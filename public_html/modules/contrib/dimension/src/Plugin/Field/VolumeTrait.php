<?php

namespace Drupal\dimension\Plugin\Field;

trait VolumeTrait {

  public static function fields() {
    return array(
      'length' => t('Length'),
      'width' => t('Width'),
      'height' => t('Height'),
    );
  }

}
