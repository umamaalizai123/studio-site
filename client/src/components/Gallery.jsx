const photos = [
  { id: 1, src: '/images/studio-1.jpg', alt: 'Row of reformer beds in a bright studio with glowing columns' },
  { id: 2, src: '/images/studio-2.jpg', alt: 'Line of reformer beds beside tall white curtains' },
]

export default function Gallery() {
  return (
    <section id="studio" className="px-[5%] py-12">
      <h2 className="mb-6 text-2xl font-bold text-berry">Our studio</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            className="h-64 w-full rounded-2xl object-cover"
          />
        ))}
      </div>
    </section>
  )
}