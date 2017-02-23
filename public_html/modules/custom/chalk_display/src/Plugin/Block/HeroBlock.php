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

  private function getMask() {
   $mask = file_create_url(drupal_get_path('module', 'chalk_display') . '/images/mask.png');
   return $mask;
  }

  private function getBackground() {
   $aquarelle = file_create_url(drupal_get_path('module', 'chalk_display') . '/images/background_aquarelle.jpg');
   return $aquarelle;
  }

  public function build() {
    $build = [
        '#theme' => 'chalk_display_hero',
        '#video' => '',
        '#aquarelle' => $this->getBackground(),
        '#attached' => array(
            'library' => array(
                'chalk_display/hero',
            ),
            'drupalSettings' => [
                'chalk_display' => [
                    'mask' => $this->getMask()
                ],
            ],
        ),
    ];
    return $build;
  }
}
