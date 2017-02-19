<?php

/**
 * @file
 * Contains \Drupal\dimension\Plugin\Field\FieldWidget\Length.
 */

namespace Drupal\dimension\Plugin\Field\FieldWidget;

use Drupal\dimension\Plugin\Field\LengthTrait;
use Drupal\Core\Annotation\Translation;
use Drupal\Core\Field\Annotation\FieldWidget;

/**
 * Plugin implementation of the 'length_field_widget' widget.
 *
 * @FieldWidget(
 *   id = "length_field_widget",
 *   label = @Translation("Dimension: Length field"),
 *   field_types = {
 *     "length_field_type"
 *   }
 * )
 */
class Length extends Dimension {

  use LengthTrait;

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return self::_defaultSettings(self::fields());
  }

}
