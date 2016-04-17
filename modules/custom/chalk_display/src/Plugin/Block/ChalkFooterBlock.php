<?php

/**
 * @file
 * Contains \Drupal\chalk_display\Plugin\Block\ChalkFooterBlock.
 */

namespace Drupal\chalk_display\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Url;
use Drupal\Core\Link;

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
   * Returns a list of social medias links.
   * @return mixed
   */
  private function socialLinksList() {
    $items = array();
    $socialMedias = array();
    $socialMedias['Facebook'] = 'https://www.facebook.com/pages/Chalk-Custom-Board-Project/837413683020006';
    $socialMedias['Ello'] = 'https://ello.co/chalk_collective';
    $socialMedias['Instagram'] = 'https://instagram.com/chalkcustomboard/';
    $socialMedias['Pinterest'] = 'https://www.pinterest.com/chalkcustom/';
    $socialMedias['YouTube'] = 'https://www.youtube.com/channel/UCkzRQhwlf39InmYu8WsRRRA';
    foreach ($socialMedias as $label => $uri) {
      $url = Url::fromUri($uri);
      $link = Link::fromTextAndUrl($label, $url);
      $link = $link->toRenderable();
      $class = strtolower(preg_replace('/[^a-zA-Z0-9-]+/', '-', $label));
      $link['#attributes'] = array('class' => array('social-media', $class));
      $items[] = render($link);
    }

    $build['social_links'] = array(
        '#theme' => 'item_list',
        '#items' => $items,
        '#type' => 'ul',
    );
    return $build;
  }

  /**
   * Returns markup for the contact details.
   * @return string
   */
  private function contactMarkup() {
    $output = '';
    $output .= t('Contact us');

    return $output;
  }

  /**
   * Returns markup for credits.
   * @return string
   */
  private function creditsMarkup() {
    $output = '';
    $output .= t('© @date Chalk Custom Board Project', array('@date' => date('Y')));
    return $output;
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];

    // @todo set internal paths in config
    // @todo refactoring needed
    $contactUrl = Url::fromUri('internal:/get-involved');
    $contactLink = Link::fromTextAndUrl(t('Get involved !'), $contactUrl);
    $contactLink = $contactLink->toRenderable();
    $contactLink['#attributes'] = array('class' => array('contact-link'));

    $brochureUrl = Url::fromUri('internal:/sites/default/files/brochures/chalk-brochure-2016.pdf');
    $brochureLink = Link::fromTextAndUrl(t('Learn more'), $brochureUrl);
    $brochureLink = $brochureLink->toRenderable();
    $brochurelink['#attributes'] = array('class' => array('brochure-link'));

    $output = [
        '#theme' => 'chalk_display_footer',
        '#contact' => $this->contactMarkup(),
        '#contact_link' => render($contactLink),
        '#brochure_link' => render($brochureLink),
        '#social_links' => render($this->socialLinksList()),
        '#credits' => $this->creditsMarkup(),
    ];
    $build['chalk_footer_block']['#markup'] = render($output);

    return $build;
  }

}
