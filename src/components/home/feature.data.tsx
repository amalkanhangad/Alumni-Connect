import React, { ReactNode } from 'react'
import ArtTrackIcon from '@mui/icons-material/ArtTrack'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'

interface Data {
  title: string
  description: string
  icon?: ReactNode
}

export const data: Data[] = [
  {
    title: 'Join The Network',
    description: 'Connect with your old mates at College and become a part of the growing alumni network.',
    icon: <ArtTrackIcon />,
  },
  {
    title: 'Keep In Touch   ',
    description: 'Get updated with the latest news and upcoming events at the College.',
    icon: <ArtTrackIcon />,
  },
  {
    title: 'Benefit Mutually ',
    description: 'Extend your helping hands to those in need, and take help if you are the one in need.    ',
    icon: <ArtTrackIcon />,
  },
  // {
  //   title: 'Lorem ipsum',
  //   description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
  //   icon: <ArtTrackIcon />,
  // },
]
