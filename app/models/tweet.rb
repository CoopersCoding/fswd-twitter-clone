class Tweet < ApplicationRecord
  belongs_to :user
  has_one_attached :image

  validates :user, presence: true
  validates :message, length: { maximum: 140 }, allow_blank: true
  validate :message_or_image_present

  private

  def message_or_image_present
    return if message.present? || image.attached?

    errors.add(:base, 'Tweet must include a message or an image')
  end
end
