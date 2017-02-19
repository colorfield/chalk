<?php

/**
 * @file
 * Contains \Drupal\dimension\Plugin\Field\FieldFormatter\Volume.
 */

namespace Drupal\dimension\Plugin\Field\FieldFormatter;

use Drupal\dimension\Plugin\Field\VolumeTrait;
use Drupal\Core\Annotation\Translation;
use Drupal\Core\Field\Annotation\FieldFormatter;

/**
 * Plugin implementation of the 'volume_field_formatter' formatter.
 *
 * @FieldFormatter(
 *   id = "volume_field_formatter",
 *   label = @Translation("Dimension: Volume"),
 *   field_types = {
 *     "volume_field_type"
 *   }
 * )
 */
class Volume extends Dimension  {

  use VolumeTrait;

}
