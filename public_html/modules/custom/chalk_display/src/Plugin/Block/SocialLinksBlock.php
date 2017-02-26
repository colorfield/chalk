<?php

/**
 * @file
 * Contains \Drupal\chalk_display\Plugin\Block\SocialLinksBlock.
 */

namespace Drupal\chalk_display\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Url;
use Drupal\Core\Link;

/**
 * Provides a 'SocialLinksBlock' block.
 *
 * @Block(
 *  id = "social_links_block",
 *  admin_label = @Translation("Social links block"),
 * )
 */
class SocialLinksBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];

    // creates a list of links with custom css identifiers
    // @todo set id's and classes
    $title = null;
    $items = array();

    // @todo uri's should use validator

    // @todo obfuscated mailto, use https://www.drupal.org/project/spamspan
    //$items[] = '<a href=\'ma&#105;lto&#58;&#119;%&#54;5lc&#111;&#109;e&#64;til%74&#102;ac&#116;ory%2&#69;&#99;&#111;m\'>w&#101;l&#99;ome&#64;&#116;&#105;ltfac&#116;o&#114;&#121;&#46;com</a>';

    // facebook link
    $url = Url::fromUri('https://fr-fr.facebook.com/chalkfactory/');
    $link = Link::fromTextAndUrl(t('Facebook'), $url);
    $link = $link->toRenderable();
    $link['#attributes'] = array('class' => array('fa fa-facebook'));
    $items[] = render($link);

    // ello link
    $url = Url::fromUri('https://ello.co/chalk_collective');
    $link = Link::fromTextAndUrl(t('Ello'), $url);
    $link = $link->toRenderable();
    $link['#attributes'] = array('class' => array('fa fa-circle'));
    $items[] = render($link);

    // Pinterest link
    $url = Url::fromUri('https://www.pinterest.com/chalkcustom/');
    $link = Link::fromTextAndUrl(t('Pinterest'), $url);
    $link = $link->toRenderable();
    $link['#attributes'] = array('class' => array('fa fa-pinterest'));
    $items[] = render($link);

    // Youtube link
    $url = Url::fromUri('https://www.youtube.com/channel/UCkzRQhwlf39InmYu8WsRRRA');
    $link = Link::fromTextAndUrl(t('Youtube'), $url);
    $link = $link->toRenderable();
    $link['#attributes'] = array('class' => array('fa fa-youtube-square'));
    $items[] = render($link);

    $render_array['links'] = array(
        '#theme' => 'item_list',
        '#items' => $items,
        '#type' => 'ul',
    );

    $output = [
      '#theme' => 'chalk_display_social_links',
      '#title' => t('Social links'),
      '#social_links'=> $render_array,
    ];

    $build['social_links']['#markup'] = render($output);

    return $build;
  }

}
