<?php

/**
 * @file
 * Contains \Drupal\chalk_display\Plugin\Block\ChalkFooterBlock.
 */

namespace Drupal\chalk_display\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'ChalkFooterBlock' block.
 *
 * @Block(
 *  id = "chalk_footer_block",
 *  admin_label = @Translation("Chalk footer block"),
 * )
 */
class ChalkFooterBlock extends BlockBase {


  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['chalk_footer_block']['#markup'] = 'Implement ChalkFooterBlock.';

    return $build;
  }

}
