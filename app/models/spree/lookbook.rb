class Spree::Lookbook < ActiveRecord::Base
  include SpreeLookbook::Lookable
  
  has_many :looks, :class_name => Spree::Look, :dependent => :destroy
  has_many :look_products, :through => :looks, :dependent => :destroy, :order => "#{Spree::LookProduct.table_name}.position ASC"
  has_many :products, :through => :look_products, :order => "#{Spree::LookProduct.table_name}.position ASC"

  has_many :images, :as => :viewable, :class_name => Spree::LookbookImage, :dependent => :destroy, :order => 'position ASC'
  
  validates :permalink, :presence => true, :uniqueness => true

  def self.config(&block)
    yield(Spree::LookbookConfig)
  end
end
