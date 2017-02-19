<?php

/**
 * @file
 * Contains \Drupal\dimension\Plugin\Field\FieldWidget\Volume.
 */

namespace Drupal\dimension\Plugin\Field\FieldWidget;

use Drupal\dimension\Plugin\Field\VolumeTrait;
use Drupal\Core\Annotation\Translation;
use Drupal\Core\Field\Annotation\FieldWidget;

/**
 * Plugin implementation of the 'volume_field_widget' widget.
 *
 * @FieldWidget(
 *   id = "volume_field_widget",
 *   label = @Translation("Dimension: Volume field"),
 *   field_types = {
 *     "volume_field_type"
 *   }
 * )
 */
class Volume extends Dimension {

  use VolumeTrait;

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return self::_defaultSettings(self::fields());
  }

}
