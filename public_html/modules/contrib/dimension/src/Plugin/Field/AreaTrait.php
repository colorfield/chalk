<?php

namespace Drupal\dimension\Plugin\Field;

trait AreaTrait {

  public static function fields() {
    return array(
      'width' => t('Width'),
      'height' => t('Height'),
    );
  }

}
