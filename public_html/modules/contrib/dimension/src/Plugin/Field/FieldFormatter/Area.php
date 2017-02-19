<?php

/**
 * @file
 * Contains \Drupal\dimension\Plugin\Field\FieldFormatter\Area.
 */

namespace Drupal\dimension\Plugin\Field\FieldFormatter;

use Drupal\dimension\Plugin\Field\AreaTrait;
use Drupal\Core\Annotation\Translation;
use Drupal\Core\Field\Annotation\FieldFormatter;

/**
 * Plugin implementation of the 'area_field_formatter' formatter.
 *
 * @FieldFormatter(
 *   id = "area_field_formatter",
 *   label = @Translation("Dimension: Area"),
 *   field_types = {
 *     "area_field_type"
 *   }
 * )
 */
class Area extends Dimension  {

  use AreaTrait;

}
