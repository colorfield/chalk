<?php

/**
 * @file
 * Contains \Drupal\chalk_display\Plugin\Block\MoreBoards.
 */

namespace Drupal\chalk_display\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\node\Entity\Node;
use Drupal\Core\Cache\Cache;
//use Drupal\chalk_display\LinkTools;


/**
 * Provides a 'More Boards' block.
 *
 * @Block(
 *   id = "More Boards",
 *   admin_label = @Translation("More Boards Block"),
 *   category = @Translation("Blocks")
 * )
 */
class MoreBoards extends BlockBase {

  private function getBoards() {
    $view = views_get_view_result('boards', 'embed_1');
    return $view;
  }

  private function getBoardLink($board) {
    $link = null;
    // @todo dependency injection
    $entityTypeManager = \Drupal::entityTypeManager();
    $languageManager = \Drupal::languageManager();
    $language = $languageManager->getCurrentLanguage()->getId();
    $node = $entityTypeManager->getStorage('node')->load($board->nid);
    if($node instanceof Node) {
      $viewBuilder = $entityTypeManager->getViewBuilder($node->getEntityTypeId());
      $link = $viewBuilder->view($node, 'teaser', $language);
//      $link = LinkTools::getLinkFromNodeId(
//        $node->getTitle(),
//        $board->nid
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

    $boards = $this->getBoards();
    $max = count($boards);
    $previousLink = null;
    $nextLink = null;

    // if node is found from routeMatch
    $node = \Drupal::routeMatch()->getParameter('node');
    if ($node instanceof Node) {
      $currentNid = $node->id();
      foreach ($boards as $key => $board) {
        if((int) $board->nid === (int) $currentNid) {
          if(isset($boards[$key - 1])){
            $previousBoard = $boards[$key - 1];
          }else{
            $previousBoard = $boards[$max - 1];
          }
          $previousLink = $this->getBoardLink($previousBoard);

          if(isset($boards[$key + 1])){
            $nextBoard = $boards[$key + 1];
          }else{
            $nextBoard = $boards[0];
          }
          $nextLink = $this->getBoardLink($nextBoard);
        }
      }

      $output = [
        '#theme' => 'chalk_display_more_boards',
        '#title' => t('More boards'),
        '#next'=> $previousLink,
        '#previous'=> $nextLink,
      ];

      $build['more_boards']['#markup'] = render($output);
    }

    return $build;
  }
}
