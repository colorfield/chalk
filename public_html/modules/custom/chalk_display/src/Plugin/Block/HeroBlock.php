<?php
/**
 * @file
 * Contains \Drupal\chalk_display\Plugin\Block\HeroBlock.
 */
namespace Drupal\chalk_display\Plugin\Block;
use Drupal\Core\Block\BlockBase;
/**
 * Provides a 'HeroBlock' block.
 *
 * @Block(
 *  id = "hero_block",
 *  admin_label = @Translation("HeroBlock"),
 * )
 */
class HeroBlock extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $output = [
        '#theme' => 'chalk_display_hero',
        '#video' => '',
        '#attached' => array(
            'library' => array(
                'chalk_display/hero',
            ),
        ),
    ];
    $build['hero_block']['#markup'] = render($output);
    return $build;
  }
}
