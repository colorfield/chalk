<?php

/**
 * @file
 * Contains \Drupal\chalk_display\Plugin\Block\FooterLinksBlock.
 */

namespace Drupal\chalk_display\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Url;
use Drupal\Core\Link;

/**
 * Provides a 'FooterLinksBlock' block.
 *
 * @Block(
 *  id = "footer_links_block",
 *  admin_label = @Translation("Footer links block"),
 * )
 */
class FooterLinksBlock extends BlockBase {


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

    // twitter link
    $url = Url::fromUri('https://twitter.com/TiltFactory');
    $link = Link::fromTextAndUrl(t('Ello'), $url);
    $link = $link->toRenderable();
    $link['#attributes'] = array('class' => array('fa fa-circle'));
    $items[] = render($link);

    // twitter link
    $url = Url::fromUri('https://twitter.com/TiltFactory');
    $link = Link::fromTextAndUrl(t('Pinterest'), $url);
    $link = $link->toRenderable();
    $link['#attributes'] = array('class' => array('fa fa-pinterest'));
    $items[] = render($link);

    // twitter link
    $url = Url::fromUri('https://twitter.com/TiltFactory');
    $link = Link::fromTextAndUrl(t('Youtube'), $url);
    $link = $link->toRenderable();
    $link['#attributes'] = array('class' => array('fa fa-youtube-square'));
    $items[] = render($link);

    $render_array['links'] = array(
        '#theme' => 'item_list',
        '#items' => $items,
        '#type' => 'ul',
    );

    $build['footer_links_block']['#markup'] = render($render_array);

    return $build;
  }

}
