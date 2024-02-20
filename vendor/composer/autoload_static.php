<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit68efef1b8066140612bebd79c2e781d6
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit68efef1b8066140612bebd79c2e781d6::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit68efef1b8066140612bebd79c2e781d6::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit68efef1b8066140612bebd79c2e781d6::$classMap;

        }, null, ClassLoader::class);
    }
}
