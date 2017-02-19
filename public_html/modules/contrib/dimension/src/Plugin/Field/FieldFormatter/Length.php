<?php

/**
 * @file
 * Contains \Drupal\dimension\Plugin\Field\FieldFormatter\Length.
 */

namespace Drupal\dimension\Plugin\Field\FieldFormatter;

use Drupal\dimension\Plugin\Field\LengthTrait;
use Drupal\Core\Annotation\Translation;
use Drupal\Core\Field\Annotation\FieldFormatter;

/**
 * Plugin implementation of the 'length_field_formatter' formatter.
 *
 * @FieldFormatter(
 *   id = "length_field_formatter",
 *   label = @Translation("Dimension: Length"),
 *   field_types = {
 *     "length_field_type"
 *   }
 * )
 */
class Length extends Dimension  {

  use LengthTrait;

}
