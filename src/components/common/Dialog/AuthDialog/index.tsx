'use client'

import { useState } from 'react'

import ForgotPassword from '@/components/common/Dialog/AuthDialog/ForgotPassword'
import Login from '@/components/common/Dialog/AuthDialog/Login'
import SignUp from '@/components/common/Dialog/AuthDialog/SignUp'
import VerifyEmail from '@/components/common/Dialog/AuthDialog/VerifyEmail'
import FacebookIcon from '@/components/icons/FacebookIcon'
import GoogleIcon from '@/components/icons/GoogleIcon'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ENV from '@/env'
import { AuthDialogTabs } from '@/types/authTypes'

type AuthDialogProps = {
  children: React.ReactNode
  defaultTab: AuthDialogTabs
}

const AuthDialog = ({ children, defaultTab }: AuthDialogProps) => {
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false)
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false)

  const [activeTab, setActiveTab] = useState(defaultTab)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const redirectToGoogleAuth = () => {
    window.location.href = ENV.GOOGLE_AUTH_URL
  }

  const redirectToFacebookAuth = () => {
    window.location.href = ENV.FACEBOOK_AUTH_URL
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open: boolean) => {
        setIsDialogOpen(open)
        setIsSignUpSuccessful(false)
        setIsShowForgotPassword(false)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {!isSignUpSuccessful && !isShowForgotPassword ? (
          <>
            <Tabs
              defaultValue={defaultTab}
              className="w-full"
              onValueChange={(value) => setActiveTab(value as AuthDialogTabs)}
            >
              <TabsList className="h-auto gap-5 bg-transparent p-0 text-foreground/80">
                <TabsTrigger
                  value={AuthDialogTabs.Login}
                  className="flex-col gap-2 p-0 data-[state=active]:text-primary [&>*]:data-[state=active]:!font-semibold [&>div]:data-[state=active]:w-full"
                >
                  <DialogTitle className="text-lg font-medium tracking-normal transition-all duration-300 ease-in-out">
                    Log In
                  </DialogTitle>
                  <div className="h-[2px] w-0 rounded-lg bg-primary transition-all duration-300 ease-in-out" />
                </TabsTrigger>
                <TabsTrigger
                  value={AuthDialogTabs.SignUp}
                  className="flex-col gap-2 p-0 data-[state=active]:text-primary [&>*]:data-[state=active]:!font-semibold [&>div]:data-[state=active]:w-full"
                >
                  <DialogTitle className="text-lg font-medium tracking-normal transition-all duration-300 ease-in-out">
                    Sign Up
                  </DialogTitle>
                  <div className="h-[2px] w-0 rounded-lg bg-primary transition-all duration-300 ease-in-out" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value={AuthDialogTabs.Login}>
                <Login
                  setIsDialogOpen={setIsDialogOpen}
                  setIsShowForgotPassword={setIsShowForgotPassword}
                />
              </TabsContent>

              <TabsContent value={AuthDialogTabs.SignUp}>
                <SignUp setIsSignUpSuccessful={setIsSignUpSuccessful} />
              </TabsContent>
            </Tabs>

            <div className="my-1 flex items-center gap-2">
              <Separator className="h-[2px] flex-auto" />
              <p className="text-center text-xs">OR</p>
              <Separator className="h-[2px] flex-auto" />
            </div>

            <Button variant="secondary" className="gap-3" onClick={redirectToGoogleAuth}>
              <GoogleIcon width={20} height={20} />
              <span>{activeTab === AuthDialogTabs.Login ? 'Log in' : 'Sign up'} with Google</span>
            </Button>
            <Button variant="secondary" className="gap-3" onClick={redirectToFacebookAuth}>
              <FacebookIcon width={20} height={20} />
              <span>{activeTab === AuthDialogTabs.Login ? 'Log in' : 'Sign up'} with Facebook</span>
            </Button>
          </>
        ) : null}

        {isSignUpSuccessful ? <VerifyEmail /> : null}

        {isShowForgotPassword ? <ForgotPassword /> : null}
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
