<?php

/**
 * @file
 * Contains \Drupal\chalk_display\Plugin\Block\MoreArtists.
 */

namespace Drupal\chalk_display\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\node\Entity\Node;
use Drupal\Core\Cache\Cache;
//use Drupal\chalk_display\LinkTools;


/**
 * Provides a 'More Artists' block.
 *
 * @Block(
 *   id = "More Artists",
 *   admin_label = @Translation("More Artists Block"),
 *   category = @Translation("Blocks")
 * )
 */
class MoreArtists extends BlockBase {

  private function getArtists() {
    $view = views_get_view_result('artists', 'embed_1');
    return $view;
  }

  private function getArtistLink(artist) {
    $link = null;
    // @todo dependency injection
    $entityTypeManager = \Drupal::entityTypeManager();
    $languageManager = \Drupal::languageManager();
    $language = $languageManager->getCurrentLanguage()->getId();
    $node = $entityTypeManager->getStorage('node')->load(artist->nid);
    if($node instanceof Node) {
      $viewBuilder = $entityTypeManager->getViewBuilder($node->getEntityTypeId());
      $link = $viewBuilder->view($node, 'teaser', $language);
//      $link = LinkTools::getLinkFromNodeId(
//        $node->getTitle(),
//        artist->nid
//      );

    }
    return $link;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags() {
    // when node change block will rebuild
    if ($node = \Drupal::routeMatch()->getParameter('node')) {
      // if there is node add its cachetag
      return Cache::mergeTags(parent::getCacheTags(), array('node:' . $node->id()));
    } else {
      // return default tags instead.
      return parent::getCacheTags();
    }
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts() {
    // if you depends on \Drupal::routeMatch()
    // you must set context of this block with 'route' context tag.
    // every new route this block will rebuild
    return Cache::mergeContexts(parent::getCacheContexts(), array('route'));
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheMaxAge() {
    // @todo set minimum cache max age
    return 0;
  }

  /**
   * {@inheritdoc}
   */
  public function build() {

    $build = [];

    $artists = $this->getArtists();
    $max = count($artists);
    $previousLink = null;
    $nextLink = null;

    // if node is found from routeMatch
    $node = \Drupal::routeMatch()->getParameter('node');
    if ($node instanceof Node) {
      $currentNid = $node->id();
      foreach ($artists as $key => artist) {
        if((int) artist->nid === (int) $currentNid) {
          if(isset($artists[$key - 1])){
            $previousArtist = $artists[$key - 1];
          }else{
            $previousArtist = $artists[$max - 1];
          }
          $previousLink = $this->getArtistLink($previousArtist);

          if(isset($artists[$key + 1])){
            $nextArtist = $artists[$key + 1];
          }else{
            $nextArtist = $artists[0];
          }
          $nextLink = $this->getArtistLink($nextArtist);
        }
      }

      $output = [
        '#theme' => 'chalk_display_more_artists',
        '#title' => t('More artists'),
        '#next'=> $previousLink,
        '#previous'=> $nextLink,
      ];

      $build['more_artists']['#markup'] = render($output);
    }

    return $build;
  }
}
