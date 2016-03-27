<?php

/**
 * @file
 * Contains \Drupal\chalk_display\Plugin\Block\ChalkMeetBlock.
 */

namespace Drupal\chalk_display\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'ChalkMeetBlock' block.
 *
 * @Block(
 *  id = "chalk_meet_block",
 *  admin_label = @Translation("Chalk meet block"),
 * )
 */
class ChalkMeetBlock extends BlockBase {


  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['chalk_meet_block']['#markup'] = 'Implement ChalkMeetBlock.';

    return $build;
  }

}
