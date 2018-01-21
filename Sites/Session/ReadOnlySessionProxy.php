<?php
namespace App\Session;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Session\Storage\Proxy\SessionHandlerProxy;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ReadOnlySessionProxy extends SessionHandlerProxy
{
    private $tokenStorage;

    public function __construct(\SessionHandlerInterface $handler, TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;

        parent::__construct($handler);
    }

    public function write($id, $data)
    {
        if ($this->getUser() && $this->getUser()->isGuest()) {
            return;
        }

        return parent::write($id, $data);
    }

    private function getUser()
    {
        if (!$token = $tokenStorage->getToken()) {
            return;
        }

        $user = $token->getUser();
        if (is_object($user)) {
            return $user;
        }
    }
}